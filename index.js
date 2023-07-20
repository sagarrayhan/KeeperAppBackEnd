import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


const mongoUrl =
  "mongodb+srv://sagarrayhan:mongo.db.2023@cluster0.ccok37n.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

const notesScema = mongoose.Schema({ title: String, note: String });
const Notes = mongoose.model("Notes", notesScema);

app.get("/", (req, res) => {
  Notes.find({}).then((data) => res.json(data));
});

app.post("/", (req, res) => {
  const note = new Notes(req.body);
  note.save();
  res.json(note);
});

app.post("/delete", (req, res) => {
  const id = req.body.id;
  Notes.findByIdAndRemove(id).exec();
});

app.post("/login", (req, res) => {
  const logindata = req.body;
  console.log(logindata);
});

app.listen(3000, () => {
  console.log("Connected on port 3000");
});
