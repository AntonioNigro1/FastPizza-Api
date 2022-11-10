export interface IAds {
  name: String;
  imagePath: String;
  description: String;
  ingredients: [String];
  price: Number;
  user: String;
}

export interface Icomments {
  _id: String;
  comment: String;
  likes: Number;
}

export interface IAdsTest {
  name: String;
  imagePath: String;
  description: String;
  ingredients: [String];
  price: Number;
  user: String;
  likes: Number;
  comments: [IcommentsTest];
}
export interface IcommentsTest {
  comment: String;
  likes: Number;
}
