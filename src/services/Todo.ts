import api from "../api";
import ITodoRequest from "../interfaces/ITodoRequest";

class Todo
{
    async list (id: number) {
        const res = await api.get(`/todos?userId=${id}&_sort=id&_order=desc`);
        const data = await res.data;
        return data;
    }

    async show (userId: number, id: string) {
        const res = await api.get(`/todos?userId=${userId}&id=${id}`);
        const data = await res.data;
        return data[0];
    }

    async store (id: number, req: ITodoRequest) {
        const f = {...req, userId: id};
        const res = await api.post("/todos", f);
        const data = await res.data;
        return data;
    }

    async update (req: any) {
        const res = await api.put("/todos/"+req.id, req);
        const data = await res.data;
        return data;
    }

    async destroy (id: number) {
        const res = await api.delete("/todos/"+id);
        const data = await res.data;
        return data;
    }

}

export default new Todo;