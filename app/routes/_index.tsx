import { json, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, useNavigate } from "@remix-run/react"
import { useState } from "react"

import { Card, CardContent } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export const meta: MetaFunction = () => {
  return [
    { title: "BayMed" },
    { description: "BayMed" }
  ]
}

export const loader = async () => {
  return json({ apiUrl: process.env.API_URL })
}

export default function Index() {
  const { apiUrl } = useLoaderData<typeof loader>()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      navigate("/dashboard")
    } else {
      console.error("Login failed")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <Card className="w-full max-w-sm m-4">
        <CardContent className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <img src="/icon.png" alt="BayMed Logo" className="h-20 w-20 mt-4" />
            <h1 className="text-2xl font-bold">BayMed</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Apelido</Label>
              <Input
                id="username"
                placeholder="Digite seu apelido"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center pt-4 space-y-4">
              <Button type="submit" className="w-full text-white">Entrar</Button>
              <Link to="/register" className="text-primary hover:underline">
                Criar uma conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
