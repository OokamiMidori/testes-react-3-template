import { render, screen, waitFor } from "@testing-library/react"
import ProductCard from "../components/ProductCard"
import axios from "axios"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        title:"item mágico",
        description:"item que faz magia",
        price:2569,
        thumbnail:"https://picsum.photos/200"
    }
}

describe("ProductCard", () => {

    test("renderiza", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        
        render(<ProductCard />)
       // screen.debug()

        await waitFor(() => { })
        //screen.debug()

    })

    test("Renderiza somente o loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        
        render(<ProductCard />)
        //screen.logTestingPlaygroundURL()
        const loadingScreen = screen.getByText(/loading\.\.\./i)
        
        expect(loadingScreen).toBeInTheDocument()
        expect(screen.queryByText(/item mágico/i)).not.toBeInTheDocument()
        await waitFor(() => { })      
    })

    test("renderiza os items do card sem o loading", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        
        render(<ProductCard />)
       
        await waitFor(() => {
            const title = screen.getByText(/item mágico/i)
        const image = screen.getByRole('img', { name: /thumbnail for item mágico/i }) 
        const description = screen.getByText(/item que faz magia/i)
        const price = screen.getByText(/\$2569/i)
        
        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument()
     })
        //screen.logTestingPlaygroundURL()
        
    })
})