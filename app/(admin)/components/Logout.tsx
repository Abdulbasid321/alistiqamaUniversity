import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove token from storage
    router.push("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
