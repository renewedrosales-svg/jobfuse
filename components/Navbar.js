"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  X,
  BriefcaseBusiness,
} from "lucide-react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase";

export default function Navbar() {

  const [mobileOpen,
    setMobileOpen] =
    useState(false);

  const [user, setUser] =
    useState(null);

  /**
   * Track auth state
   */
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);
        }
      );

    return () =>
      unsubscribe();

  }, []);

  /**
   * Logout
   */
  async function handleLogout() {

    try {

      await signOut(auth);

    } catch (err) {

      console.error(err);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur-xl">

      <div className="container-app h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md">

            <BriefcaseBusiness
              className="text-white"
              size={22}
            />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              JobFuse
            </h1>

            <p className="text-xs text-slate-500 -mt-1">
              Modern Job Marketplace
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">

          <Link
            href="/"
            className="text-slate-600 hover:text-blue-600 font-medium transition"
          >
            Browse Jobs
          </Link>

          {user ? (

            <>
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-blue-600 font-medium transition"
              >
                Dashboard
              </Link>

              {user.email ===
                process.env
                  .NEXT_PUBLIC_ADMIN_EMAIL && (

                <Link
                  href="/admin"
                  className="text-slate-600 hover:text-blue-600 font-medium transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={
                  handleLogout
                }
                className="btn-secondary"
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link
                href="/signin"
                className="btn-secondary"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="btn-primary"
              >
                Post a Job
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          className="md:hidden"
        >
          {mobileOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (

        <div className="md:hidden border-t border-blue-100 bg-white">

          <div className="container-app py-6 flex flex-col gap-4">

            <Link
              href="/"
              onClick={() =>
                setMobileOpen(false)
              }
              className="text-slate-700 font-medium"
            >
              Browse Jobs
            </Link>

            {user ? (

              <>
                <Link
                  href="/dashboard"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="text-slate-700 font-medium"
                >
                  Dashboard
                </Link>

                {user.email ===
                  process.env
                    .NEXT_PUBLIC_ADMIN_EMAIL && (

                  <Link
                    href="/admin"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="text-slate-700 font-medium"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={
                    handleLogout
                  }
                  className="btn-secondary w-full"
                >
                  Logout
                </button>
              </>

            ) : (

              <>
                <Link
                  href="/signin"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="btn-secondary text-center"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="btn-primary text-center"
                >
                  Post a Job
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}