import { render } from "@testing-library/react"
import { LoginForm } from "./LoginForm"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../../../context/AuthContext"
import userEvent from "@testing-library/user-event"
import { api } from '../../../api'
import { vi } from 'vitest'

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

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should display validation errors when submitting empty form", async () => {
    const { getByRole, findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    )


    const button = getByRole('button', { name: 'Entrar' })
    const user = userEvent.setup()
    await user.click(button)

    const emailError = await findByText('ⓘ E-mail inválido!')
    expect(emailError).toBeInTheDocument()

    const passwordError = await findByText('ⓘ Mínimo de 8 caracteres!')
    expect(passwordError).toBeInTheDocument()
  })

  it("should navigate to /activity when user submits form", async () => {
    vi.mocked(api.post).mockResolvedValueOnce({ data: { token: 'fake-token' } })

    const { getByLabelText, getByRole } = render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    )


    const emailInput = getByLabelText('E-mail')
    const passwordInput = getByLabelText('Senha')
    const button = getByRole('button', { name: 'Entrar' })
    const user = userEvent.setup()
    await user.type(emailInput, "user@example.com")
    await user.type(passwordInput, "12345678")
    await user.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/activity')
  })

  it("should display invalid credential error when credentials are invalid", async () => {

    const { getByLabelText, getByRole, findByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    )

    vi.mocked(api.post).mockRejectedValueOnce(
      Object.assign(new Error(), {
        isAxiosError: true,
        response: {
          status: 401,
          data: { message: "Credenciais inválidas" }
        }
      })
    )

    const emailInput = getByLabelText('E-mail')
    const passwordInput = getByLabelText('Senha')
    const button = getByRole('button', { name: 'Entrar' })
    const user = userEvent.setup()
    await user.type(emailInput, "user@example.com")
    await user.type(passwordInput, "12345678")
    await user.click(button)

    const credentialError = await findByText("ⓘ Credenciais inválidas")
    expect(credentialError).toBeInTheDocument()
  })
})



