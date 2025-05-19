const errorsHandlers: any = {}

const onError = (params: {name: string,callback: (err: any) => void}) => {
    errorsHandlers[params.name] = params.callback
}


const triggerErrorHandler = (params: {nameFunctionErrorExecuted: string,errors: any}) => { 
    if(params.errors) {
        for(const i in errorsHandlers) {
            if(typeof errorsHandlers[i] === 'function') { 
                if(i === params.nameFunctionErrorExecuted) {
                    errorsHandlers[i](params.errors)
                }
            }
        }
    }
}

export { onError, triggerErrorHandler }