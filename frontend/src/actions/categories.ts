"use server";

export async function createCategoryAction(formData: FormData) {
    const name = formData.get("name");
    console.log(name);
}
