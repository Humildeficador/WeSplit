import { registerSchema } from "./registerSchema";

describe('registerSchema', () => {

  it("should reject name shorter than 2 characters", () => {
    const result = registerSchema.safeParse({
      name: "a",
      email: "user@example.com",
      password: "12345678",
      confirmPassword: "12345678"
    })

    expect(result.success).toBe(false)
  })

  it("should reject name longer than 30 characters", () => {
    const result = registerSchema.safeParse({
      name: "rafaelrafaelfaflalfdaldladlsaldaldsalddasdlasd",
      email: "user@example.com",
      password: "12345678",
      confirmPassword: "12345678"
    })

    expect(result.success).toBe(false)
  })


  it("should reject invalid email", () => {
    const result = registerSchema.safeParse({
      name: "user",
      email: "isso-nao-e-email",
      password: "12345678",
      confirmPassword: "12345678"
    })

    expect(result.success).toBe(false)
  })

  it("should reject password shorter than 8 characters", () => {
    const result = registerSchema.safeParse({
      name: "user",
      email: "user@example.com",
      password: "blabla",
      confirmPassword: "blabla"
    })

    expect(result.success).toBe(false)
  })

  it("should reject password longer than 72 characters", () => {
    const result = registerSchema.safeParse({
      name: "user",
      email: "user@example.com",
      password: "blabladasdalsvladvlaslalvsaldaslvdsaldvlsadlvsalvdaslvldasldvlasvdlasdvlasvdlaldvlsavvldaslvlaslvdlaslvdasl",
      confirmPassword: "blabladasdalsvladvlaslalvsaldaslvdsaldvlsadlvsalvdaslvldasldvlasvdlasdvlasvdlaldvlsavvldaslvlaslvdlaslvdasl"
    })

    expect(result.success).toBe(false)
  })

  it("should reject when passwords do not match", () => {
    const result = registerSchema.safeParse({
      name: "user",
      email: "user@example.com",
      password: "blablaa",
      confirmPassword: "blabla123"
    })

    expect(result.success).toBe(false)
  })

  it("should accept valid name, email, password and confirmPassword", () => {
    const result = registerSchema.safeParse({
      name: "user",
      email: "user@example.com",
      password: "12345678",
      confirmPassword: "12345678"
    })

    expect(result.success).toBe(true)
  })
})