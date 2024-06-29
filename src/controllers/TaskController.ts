import type { Request, Response } from "express";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        const { projectId } = req.params
        try {
            console.log(projectId)
        } catch (error) {
            console.log(error)
        }
    }
}