import { useEffect, useState } from "react"
import { api } from "../api"
import type { Group } from "../types/Group"
import axios from "axios"

export const useUserGroups = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasGroup = groups.length > 0

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await api.get('/me/groups')
        setGroups(data.groups)
        setIsLoading(false)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message)
        }
        setIsLoading(false)
      }
    }

    fetchGroups()
  }, [])

  return { groups, isLoading, error, hasGroup }
}