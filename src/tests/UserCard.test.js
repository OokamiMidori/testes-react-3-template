import { render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import UserCard from "../components/UserCard"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        firstName: "Fulano",
        lastName: "Silva",
        bank: {
            cardNumber: "12345646456132",
            cardExpire: "10/23"
        }
    }
}

describe("UserCard", () => {
    test("renderiza", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard />)
        screen.debug()

        await waitFor(() => { })
        screen.debug()

    })

    test("Renderiza o nome, sobrenome, número do cartão e data de válidade", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<UserCard />)
        await waitFor(() => {
            expect(screen.getByText(/fulano silva/i)).toBeInTheDocument()
            expect(screen.getByText(/1234 5646 4561 32/i)).toBeInTheDocument()
            expect(screen.getByText(/10\/23/i)).toBeInTheDocument()
        })
        //screen.logTestingPlaygroundURL()
    })
})