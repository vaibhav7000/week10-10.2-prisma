import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function insertUser(username: string, password: string, firstname?: string, lastname?: string): Promise<void> {
    const finalUser: {
        username: string;
        password: string;
        firstname?: string;
        lastname?: string
    } = {
        username, password
    }

    if(firstname) {
        finalUser["firstname"] = firstname;
    }

    if(lastname) {
        finalUser["lastname"] = lastname
    }

    try {
        const response = await prisma.user["create"]({
            data: {
                ...finalUser
            }, select: {
                id: true,
                firstname: true,
                lastname: true
            }
        })

        console.log(response);
    } catch (error) {
        console.log("error occured when adding user");
        console.log(error);
    }


}

// insertUser("vc", "random123", "JS", "Ch");


interface UpdateUser {
    firstname?: string,
    lastname?: string
}

type UpdateUserTy<T> = {
    firstname: T,
    lastname: T
}

async function updateUser(id: number, data: UpdateUser) {
    try {
        const response = await prisma["user"]["update"]({
            where: {
                id
            }, data: {
                ...data
            }, select: {
                firstname: true,
                lastname: true,
            }
        })

        console.log(response);

        console.log("successfully updated the firstname and lastname");
    } catch(error) {
        console.log(error);
        throw error;
    }
}


async function deleteUser(id: number) {
    try {
        const response = await prisma["user"]["delete"]({
            where: {
                id
            }, select: {
                firstname: true,
                lastname: true,
                username: true
            }
        })

        console.log(response);

        console.log("Successfully deleted the data from the user")
    } catch (error) {
        throw error
    }
}

async function UpdateAndDelete() {
    try {
        const response = await updateUser(1, {
            firstname: "VC",
        })

        await deleteUser(1); 
    } catch (error) {
        
    }
}


async function getUser(username: string) {
    try {
        const result = await prisma.user["findFirst"]({
            where: {
                username,
            }, select: {
                username: true,
                password: true,
                firstname: true,
                lastname: true
            }
        })

        if(!result) {
            console.log("no user with username is found");
            return
        }

        console.log(result)
    } catch (error) {
        console.log("error in getting userinfo of " + username);
        console.log(error);
    }
}

getUser("VC");

// UpdateAndDelete();