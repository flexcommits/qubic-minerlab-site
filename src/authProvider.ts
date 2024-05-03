import { AuthBindings } from "@refinedev/core";

import { supabaseClient } from "./utility";

const authProvider: AuthBindings = {
  login: async ({ email, password, providerName, remember }) => {
    // sign in with oauth
    try {
      const username = email
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        if (data?.url) {
          return {
            success: true,
            redirectTo: "/",
          };
        }
      }

      // sign in with email and password
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email.toLowerCase() + "@obr.com.hk",
        // email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data?.user) {
        if (remember) {
          // Save the username in the local storage
          localStorage.setItem("username", username);
        }else {
          // Remove the username from the local storage
          localStorage.removeItem("username");
        }

        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ email, password, confirmPassword, referral_id }) => {
    try {      
      if (password !== confirmPassword) {
        return {
          success: false,
          error: {
            message: "Register Error",
            name: "Password not match",
          },
        };
      }

      // Check userprofile table if username like is exists
      const { data: profileData, error: profileError } = await supabaseClient.from('userprofiles')
        .select("username")
        .ilike("username", email.substring(0, 5).toLowerCase() + "%")

      console.log("profileData", profileData, profileError)

      if (profileData !== null && profileData.length > 0) {
        return {
          success: false,
          error: {
            message: "Register Error",
            name: "Username already exists",
          },
        };
      }

      email += "@obr.com.hk";
      email = email.toLowerCase();

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        var nameMatch = email.match(/^([^@]*)@/);
        var username = nameMatch ? nameMatch[1] : null;

        const { data: profileData, error: profileError } = await supabaseClient.from('userprofiles')
          .insert([
            { email: email, username: username, minerId: username, referral_id: referral_id},
          ])
          .select()

        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async ({ password, redirectTo = '/' }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: redirectTo,
          successNotification: {
            message: "Update password successful",
            description: "You have successfully updated password.",
          },
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const user = await supabaseClient.auth.getUser();

    if (user) {
      return user.data.user?.role;
    }

    return null;
  },
  getIdentity: async () => {
    // const { data } = await supabaseClient.auth.getUser();

    // if (data?.user) {
    //   return {
    //     ...data.user,
    //     name: data.user.email,
    //   };
    // }
    const { data: userData } = await supabaseClient.auth.getUser();

    if (userData?.user) {
      const { data: profileData } = await supabaseClient.from("userprofiles")
        .select("*")
        .match({ email: userData?.user.email })
        .single()

      return {
        ...profileData
      };
    }

    return null;
  },
};

export default authProvider;
