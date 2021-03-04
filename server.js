const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//app.set('view engine', 'ejs');

app.use(bodyParser.json({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:divdeep1900@cluster0.awva7.mongodb.net/keeperDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const notesSchema = {
  title: String,
  content:String
};

const Note = mongoose.model("Note", notesSchema);



app.get("/", function(req, res) {
Note.find({}, function(err, foundItems) {

      if (err) {
        console.log(err);
      } else {
        res.send(foundItems);
      }
    });



  });





app.post("/", function(req, res) {
console.log(req);
  const ntitle = req.body.title;
  const ncontent =req.body.content;
  console.log(ntitle);
const note = new Note({
  title : ntitle,
  content:ncontent
});
console.log(note);
note.save();

});
// .delete(function(req,res){
//   Article.deleteOne({
//     title:req.params.articleTitle
//   },function(err){
//     if(!err){
//       res.send("deleted");
//     }
//   })
// });


app.delete("/delete/:id",function(req,res){
  const checkedItemId = req.params.id;
  console.log(checkedItemId);
  Note.findByIdAndDelete(checkedItemId,function(err){
    if(!err){
      console.log("Deleted checked item");
    }

  });

});

app.listen(process.env.PORT||5000, function() {
  console.log("Server started on port 5000");
});
