export const editPost = async (edit: any, serverULR: string, id: number) => {
    const res = await fetch(`${serverULR}/posts`, {
        method: "PUT",
        body: JSON.stringify({ edit, id }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    return data
}