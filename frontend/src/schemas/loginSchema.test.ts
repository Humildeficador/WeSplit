import { loginSchema } from "./loginSchema";

describe('loginSchema', () => {

  it("should reject invalid email", () => {
    const result = loginSchema.safeParse({
      email: "isso-nao-e-email",
      password: '12345678'
    })

    expect(result.success).toBe(false)
  })

  it("should reject password shorter than 8 characters", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "blabla"
    })

    expect(result.success).toBe(false)
  })

  it("should reject password longer than 62 characters", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "blabladasdalsvladvlaslalvsaldaslvdsaldvlsadlvsalvdaslvldasldvlasvdlasdvlasvdlaldvlsavvldaslvlaslvdlaslvdasl"
    })

    expect(result.success).toBe(false)
  })

  it("should accept valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "12345678"
    })

    expect(result.success).toBe(true)
  })

})