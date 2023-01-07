export function successResponse(data?:any):{status:string, data?:any}{
    return {
       status:"success",
       data
    }
}