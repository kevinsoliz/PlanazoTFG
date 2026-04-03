import { Router } from "express";
import pool from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/perfiles/:id", async(req, res) => {

    try {

        let perfil = await pool.query("SELECT * FROM perfiles WHERE user_id = $1", [req.params.id])
        
        if (perfil.rows.length === 0) {
            res.status(404).json( { error: "Perfil no encontrado "});
            return;
        }
    
        res.json( { perfil: perfil.rows[0] });

    } catch (error) {
        res.status(500).json( { error: "Error del servidor" });
    }

})

router.patch("/perfiles/:id", requireAuth, async (req, res) => {
    if (Number(req.params.id) != req.session.userId) {
        res.status(403).json( { error: "No puedes editar el perfil de otra persona."});
        return;
    }

    const { nombre, username, descripcion, categorias } = req.body;

    try {
        const resultado = await pool.query("UPDATE perfiles SET nombre = $1, username = $2, descripcion = $3, categorias = $4 WHERE user_id = $5 RETURNING *", 
            [nombre, username, descripcion, categorias, req.params.id]
        );

        if (resultado.rows.length === 0) {
            res.status(404).json({ error: "Perfil no encontrado."});
            return;
        }
        
        res.json({ perfil: resultado.rows[0] });

    } catch (error) {
        res.status(500).json({ error: "Error del servidor."})
    }

} )
export default router;