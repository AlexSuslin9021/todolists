// обработка состояния аспектов всего приложения:
// выбранный язык интерфейса, загружаются ли данные или нет, кто именно сейчас залогинен в систему…


//initial state
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'imgLoading'


const initialState = {
    error:'SOME ERROR' as null | string,
    status: 'loading' as RequestStatusType,
    } // as(воспринимай как этот тип) RequestStatusType! типизация объекта

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
//Action creator

export const setStatusAC=(status:RequestStatusType)=>{return {type:'APP/SET-STATUS',status } as const}
export const setErrorAC=(error:null | string)=>{return {type:'APP/SET-ERROR',error } as const}

//Thunk



// type
type ActionsType = SetStatusType | SetErrorType
type InitialStateType = typeof initialState
export type SetStatusType = ReturnType<typeof setStatusAC >
export type SetErrorType = ReturnType<typeof setErrorAC >
