import express from 'express'
import * as db from './util/database.js'
import cors from "cors";

const PORT = 8080;
const app = express()
app.use(cors())
app.use(express.json())

app.get("/blog",(req,res) =>{
    try {
        const blogs = db.getAllBlogs();
    res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.post("/blog",(req,res) =>{
try {
    const {szerzo, cim, kategoria, tartalom} = req.body
    if (!szerzo || !cim || !kategoria|| !tartalom){
        return res.status(400).json({message: "Data missing"})
    }
    const savedBlog = db.createBlog(szerzo, cim, kategoria, tartalom)
    if (savedBlog.changes != 1){
        return res.status(422).json({message: "Failed to upload"})
    }
    res.status(201).json({id: savedBlog.lastInsertRowid ,szerzo, cim, kategoria})
} catch (error) {
    res.status(500).json({message: "Error: "+error})
}
})

app.put("/blog/:id",(req,res) =>{
    try {
        const {szerzo, cim, kategoria, tartalom} = req.body
        if (!szerzo || !cim || !kategoria|| !tartalom){
           return res.status(400).json({message: "Data missing"})
        }
        const savedBlog = db.setBlog(req.params.id,szerzo, cim, kategoria, tartalom)
        if (savedBlog.changes != 1){
            return res.status(422).json({message: "Failed to upload"})
        }
        res.status(200).json({id: savedBlog.lastInsertRowid ,szerzo, cim, kategoria, tartalom})
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.delete("/blog/:id",(req,res) =>{
    try {
        const deleteBlog  = db.deleteBlog(req.params.id)
        if (deleteBlog.changes != 1){
            return res.status(422).json({message: "Failed to upload"})
        }
        res.status(200).json({ message: "Delete successful" });
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.listen(PORT, ()=> console.log("Runs at "+PORT))