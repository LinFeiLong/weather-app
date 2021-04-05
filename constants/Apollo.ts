import { makeVar } from "@apollo/client"

export const citiesInVar = makeVar<string[]>([])
export const editModeInVar = makeVar<boolean>(false)
