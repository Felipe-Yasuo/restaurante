"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createProductAction } from "@/actions/products";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/types";
import Image from "next/image";
import { Upload } from "lucide-react";

interface ProductFormProps {
    categories: Category[];
}

export function ProductForm({ categories }: ProductFormProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [priceValue, setPriceValue] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    async function handleCreateProduct(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append("category_id", selectedCategory);

        const result = await createProductAction(formData);

        setIsLoading(false);

        if (result.success) {
            setOpen(false);
            setSelectedCategory("");
            router.refresh();
            return;
        } else {
            console.log(result.error);
            alert(result.error);
        }
    }

    function formatToBrl(value: string) {
        // REMOVER TUDO QUE NÃO é numero
        const numbers = value.replace(/\D/g, "");

        if (!numbers) return "";

        // Converter para numero e dividir po 100 para ter os centavos
        const amount = parseInt(numbers) / 100;

        return amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatToBrl(e.target.value);
        setPriceValue(formatted);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    }

    function clearImage() {
        setImageFile(null);
        setImagePreview(null);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-brand-primary hover:bg-brand-primary font-semibold">
                    <Plus className="h-5 w-5 mr-2" />
                    Novo produto
                </Button>
            </DialogTrigger>

            <DialogContent className="p-6 bg-app-card text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Criar novo produto</DialogTitle>
                    <DialogDescription>Criando novo produto...</DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleCreateProduct}>
                    <div>
                        <Label htmlFor="name" className="mb-2">
                            Nome do produto
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Digite o nome do produto..."
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <div>
                        <Label htmlFor="price" className="mb-2">
                            Preço
                        </Label>
                        <Input
                            id="price"
                            name="price"
                            required
                            placeholder="Ex: 35,00"
                            className="border-app-border bg-app-background text-white"
                            value={priceValue}
                            onChange={handlePriceChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description" className="mb-2">
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            required
                            placeholder="Digite a descrição do produto..."
                            className="border-app-border bg-app-background text-white min-h-[100px]"
                        />
                    </div>

                    <div>
                        <Label htmlFor="category" className="mb-2">
                            Categoria
                        </Label>
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                            required
                        >
                            <SelectTrigger className="border-app-border bg-app-background text-white">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent className="bg-app-card border-app-border">
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                        className="text-white hover:bg-transparent cursor-pointer"
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file" className="mb-2">
                            Imagem do produto
                        </Label>
                        {imagePreview ? (
                            <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="preview da imagem"
                                    fill
                                    className="object-cover z-10"
                                />

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={clearImage}
                                    className="absolute top-2 right-2 z-20"
                                >
                                    Excluir
                                </Button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                <Label htmlFor="file">Clique para selecionar uma imagem</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={handleImageChange}
                                    required
                                    className="hidden"
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !selectedCategory}
                        className="w-full bg-brand-primary text-white hover:bg-brand-primary disabled:opacity-50"
                    >
                        {isLoading ? "Criando..." : "Criar produto"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
