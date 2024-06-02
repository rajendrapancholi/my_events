import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { connectToDB } from './utils/database';
import User from './models/UserModel';

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await connectToDB();
        if (credentials == null) {
          return null;
        }
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return user;
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },

  callbacks: {
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        };
      }
      if (trigger == 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },

    async signIn({ account, profile, user, credentials }: any) {
      console.log(user);
      try {
        await connectToDB();
        // check if user already exists.
        const userExists = await User.findOne({ email: profile.email });
        // if not, create a new document and save user in mongodb
        if (!userExists) {
          const newUser = await new User({
            email: profile.email,
            name: profile.name,
            password: 'user',
            image: profile.picture,
            isAdmin: false,
          });
          await newUser.save();
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
