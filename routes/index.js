const express = require("express");
var router = express.Router();

router.use(express.json());

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "멋사 1팀 토이프로젝트 프론트 연습 API" });
});

let postsId = 0;
let posts = [];

/** 게시물 생성 */
router.post("/posts", (req, res) => {
  const { contents } = req.body;

  postsId++;

  const post = {
    id: postsId,
    contents: contents,
    comments: [],
    heart: false,
  };

  posts.push(post);

  res.json(post);
});

/** 게시물 모두 불러오기 */
router.get("/posts", (req, res) => {
  res.json({ posts: posts });
});

/** 댓글 작성 */
router.post("/comment", (req, res) => {
  const { contents, id } = req.body;

  const idx = posts.findIndex((e) => e.id === id);
  posts[idx].comments.push(contents);

  const response = {
    id: id,
    comments: contents,
  };

  res.json(response);
});

/** 좋아요 */
router.patch("/heart", (req, res) => {
  const { id } = req.body;

  console.log(id);
  const idx = posts.findIndex((e) => e.id === Number(id));

  if (idx === -1) {
    return res.status(404).json({ error: "해당 게시물이 없습니다." });
  }

  const heart = posts[idx].heart;
  posts[idx].heart = !heart;

  res.json(posts[idx].heart ? "좋아요!" : "좋아요 해제");
});

module.exports = router;
