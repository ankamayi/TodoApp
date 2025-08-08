import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app:  Express = express();
const PORT = 8080;

app.use(express.json());
const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    return res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
    try {
        const { title, isCompleted } = req.body;
        const createTodo = await prisma.todo.create({
            data: {
                title: title,
                isCompleted: isCompleted,
            },
         });
         //成功した場合は、作成されたTODOをJSON形式で返す
        return res.json(createTodo);
    } catch (e) {
        return res.status(500).json({ error: "Failed to create todo"});
    }
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, isCompleted } = req.body;
        const editTodo = await prisma.todo.update({
            where: { id },
            data: {
                title: title,
                isCompleted: isCompleted,
            },
         });
         //成功した場合は、作成されたTODOをJSON形式で返す
        return res.json(editTodo);
    } catch (e) {
        return res.status(500).json({ error: "Failed to create todo"});
    }
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleteTodo = await prisma.todo.delete({
            where: { id },
         });
         //成功した場合は、作成されたTODOをJSON形式で返す
        return res.json(deleteTodo);
    } catch (e) {
        return res.status(500).json({ error: "Failed to create todo"});
    }
});
app.listen(PORT,() => console.log("server is running🚀"));
