import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../../../context/AuthContext"
import { RegisterForm } from "./RegisterForm"
import userEvent from "@testing-library/user-event"
import { vi } from 'vitest'
import { api } from "../../../api"

vi.mock('../../../api', () => ({
  api: {
    post: vi.fn()
  }
}))

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display validation errors when submitting empty form', async () => {
    const { getByRole, findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </BrowserRouter>
    )

    const button = getByRole('button', { name: 'Inscrever-se' })
    const user = userEvent.setup()
    await user.click(button)

    const nameError = await findByText('ⓘ Mínimo de 2 caracteres!')
    expect(nameError).toBeInTheDocument()

    const emailError = await findByText('ⓘ Insira um e-mail válido!')
    expect(emailError).toBeInTheDocument()

    const passwordError = await findByText('ⓘ Mínimo de 8 caracteres!')
    expect(passwordError).toBeInTheDocument()
  })

  it('should display validation error when confirmPassword are different to password', async () => {
    const { getByRole, getByLabelText, findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </BrowserRouter>
    )

    const nameInput = getByLabelText('Seu nome')
    const emailInput = getByLabelText('Seu e-mail')
    const passwordInput = getByLabelText('Criar senha')
    const confirmPasswordInput = getByLabelText('Confirme sua senha')
    const button = getByRole('button', { name: 'Inscrever-se' })

    const user = userEvent.setup()
    await user.type(nameInput, "user")
    await user.type(emailInput, "user@example.com")
    await user.type(passwordInput, "12345678")
    await user.type(confirmPasswordInput, "87654321")
    await user.click(button)

    const confirmPasswordError = await findByText('ⓘ As senhas não coincidem')
    expect(confirmPasswordError).toBeInTheDocument()
  })

  it('should display conflict error when e-mail is duplicate in database', async () => {
    vi.mocked(api.post).mockRejectedValueOnce(
      Object.assign(new Error(), {
        isAxiosError: true,
        response: {
          status: 409,
          data: { message: "Este e-máil já está cadastrado com outra conta." }
        }
      })
    )

    const { getByRole, getByLabelText, findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </BrowserRouter>
    )

    const nameInput = getByLabelText('Seu nome')
    const emailInput = getByLabelText('Seu e-mail')
    const passwordInput = getByLabelText('Criar senha')
    const confirmPasswordInput = getByLabelText('Confirme sua senha')
    const button = getByRole('button', { name: 'Inscrever-se' })

    const user = userEvent.setup()
    await user.type(nameInput, "user")
    await user.type(emailInput, "user@example.com")
    await user.type(passwordInput, "12345678")
    await user.type(confirmPasswordInput, "12345678")
    await user.click(button)

    const conflictError = await findByText('ⓘ Este e-máil já está cadastrado com outra conta.')
    expect(conflictError).toBeInTheDocument()
  })

  it('should navigate to /activity when user successfully creates account', async () => {
    vi.mocked(api.post)
      .mockResolvedValueOnce({ data: {} })
      .mockResolvedValueOnce({ data: { token: 'fake-token' } })

    const { getByRole, getByLabelText } = render(
      <BrowserRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </BrowserRouter>
    )

    const nameInput = getByLabelText('Seu nome')
    const emailInput = getByLabelText('Seu e-mail')
    const passwordInput = getByLabelText('Criar senha')
    const confirmPasswordInput = getByLabelText('Confirme sua senha')
    const button = getByRole('button', { name: 'Inscrever-se' })

    const user = userEvent.setup()
    await user.type(nameInput, "user")
    await user.type(emailInput, "user@example.com")
    await user.type(passwordInput, "12345678")
    await user.type(confirmPasswordInput, "12345678")
    await user.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/activity')
  })
})