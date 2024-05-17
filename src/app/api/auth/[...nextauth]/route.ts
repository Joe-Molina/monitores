import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../../libs/prisma";
import { redirect } from "next/navigation";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        const userFound = await prisma.usuarios.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error("No user found");

        console.log(userFound);

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Wrong password");

        // abajo se hacia una consulta para agregar un registro de inicio de sesion, pero la cambiaremos para que ecree un registro en la tabla auditoria con accion inicio de sesion y descipcion por definir

        // const newInicioDeSesion = await prisma.iniciosDeSesion.create({
        //   data: {
        //     id_usuario: userFound.id,
        //   },
        // });

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        //   newInicioDeSesion,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.SECRET,
  callbacks: {
    //@ts-ignore
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    //@ts-ignore
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export async function loginIsRequiredServer() {
  //@ts-ignore
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) return redirect("/auth/login");

  //@ts-ignore
  const userId = session.user.id;

  return session;
}

//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };