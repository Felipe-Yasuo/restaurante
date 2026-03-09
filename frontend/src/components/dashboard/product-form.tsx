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

interface ProductFormProps {
    categories: Category[];
}

export function ProductForm({ categories }: ProductFormProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
                            Preço (em centavos)
                        </Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            required
                            placeholder="Ex: 3500 para R$ 35,00"
                            className="border-app-border bg-app-background text-white"
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
                                        className="text-white hover:bg-app-background focus:bg-app-background cursor-pointer"
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="file" className="mb-2">
                            Imagem do produto
                        </Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            required
                            accept="image/jpeg,image/jpg,image/png"
                            className="border-app-border bg-app-background text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-primary/90"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Formatos aceitos: JPG, JPEG, PNG (máx. 4MB)
                        </p>
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
