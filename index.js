import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/keeperApp");

const notesScema = mongoose.Schema({ title: String, note: String });
const Notes = mongoose.model("Notes", notesScema);

app.get("/", async (req, res) => {
  await Notes.find({}).then((data) => res.json(data));
});

app.post("/", async (req, res) => {
  const note = new Notes(req.body);
  await note.save();
  res.json(note);
});

app.post("/delete", (req, res) => {
  const id = req.body.id;
  Notes.findByIdAndRemove(id).exec();
});

app.post("/login" , (req, res)=>{
   const logindata = req.body;
   console.log(logindata);
})

app.listen(3000, () => {
  console.log("Connected on port 3000");
});
