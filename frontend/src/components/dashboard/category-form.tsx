"use client";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createCategoryAction } from "@/actions/categories";

export function CategoryForm() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-brand-primary hover:bg-brand-primary font-semibold">
                    <Plus className="h-5 w-5 mr-2" />
                    Nova categoria
                </Button>
            </DialogTrigger>

            <DialogContent className="p-6 bg-app-card text-white">
                <DialogHeader>
                    <DialogTitle>Criar nova categoria</DialogTitle>
                    <DialogDescription>Criando nova categoria...</DialogDescription>
                </DialogHeader>

                <form className="space-y-4" action={createCategoryAction}>
                    <div>
                        <Label htmlFor="category" className="mb-2">
                            Nome da categoria
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Digite o nome da categoria..."
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-brand-primary text-white hover:bg-brand-primary"
                    >
                        Criar categoria
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
