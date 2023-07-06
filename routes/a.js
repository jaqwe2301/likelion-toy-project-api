let posts = [
  {
    id: 1,
    contents: "배가 너무 고픕니다!",
    comments: [],
    heart: false,
  },
];


const idx = posts.findIndex((e) => e.id === 1);
const heart = posts[idx].heart;
posts[idx].heart = !heart;

console.log(posts)