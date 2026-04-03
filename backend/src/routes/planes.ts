import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import  pool  from "../db"

const router = Router();

router.post("/", requireAuth, async (req, res) => {
    const { titulo, categoria, descripcion, fecha, ubicacion, aforo_max } = req.body;

    if (!titulo || !categoria || !fecha || !aforo_max) {
        res.status(400).json({ error: "Faltan campos."});
        return;
    }

    try {
        const planesActivos = await pool.query(
            "SELECT COUNT(*) FROM planes WHERE creator_id = $1 AND fecha > NOW()",
            [req.session.userId]
        );

        if (parseInt(planesActivos.rows[0].count) >=3) {
            res.status(400).json({ error: "Has alcanzado el límite de 3 planes activos"});
            return;
        }

        const nuevo = await pool.query(
            "INSERT INTO planes (creator_id, titulo, categoria, descripcion, fecha, ubicacion, aforo_max) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [req.session.userId, titulo, categoria, descripcion, fecha, ubicacion, aforo_max]
        );

        // el user que crea el plan ya forma parte de él automaticamente.
        await pool.query(
            "INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)",
            [nuevo.rows[0].id, req.session.userId]
        );

        res.status(201).json( { plan: nuevo.rows[0]});
    } catch (error) {
        console.log("Este es el error: ", error);
        res.status(500).json( { error: "Error del servidor"});
    }


});

export default router;