import mongoose from "mongoose";
import "dotenv/config";
import app from "../../app.js";
import request from "supertest";
import jwt from "jsonwebtoken";

const { PORT, DB_HOST, JWT_SECRET } = process.env;

describe("test login route", () => {
  let server;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it("login with correct data", async () => {
    const loginData = {
      email: "filipchukdv@gmail.com",
      password: "12345",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    expect(jwt.decode(body.token)).toBeTruthy();
    expect(body.user.email).toBe(loginData.email);
    expect(typeof body.user.subscription).toBe("string");
  });

  it("login with incorrect password", async () => {
    const loginData = {
      email: "filipchukdv@gmail.com",
      password: "123456789",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password is invalid");
  });

  it("login with incorrect password and email", async () => {
    const loginData = {
      email: "bfbdfbdfbdffb@gmail.com",
      password: "123456789",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password is invalid");
  });
});
