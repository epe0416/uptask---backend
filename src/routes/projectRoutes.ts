import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router();

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.createProject);

router.get('/', ProjectController.getAllProjects);

router.get('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    ProjectController.getProjectById);

router.put('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción del Proyecto es Obligatoria'),
    handleInputErrors,
    ProjectController.updateProject);

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    ProjectController.deleteProject);

// Routes ofr tasks
router.post('/:projectId/tasks',
    validateProjectExists,
    body('name')
        .notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción de la tarea es Obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    validateProjectExists,
    TaskController.getProjectTasks
)

export default router;