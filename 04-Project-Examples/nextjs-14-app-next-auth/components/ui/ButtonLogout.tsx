
import { signOut } from "@/auth"

const ButtonLogout = ({}) => {
    return (
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
          className="w-full"
        >
          <button>
            Sign Out
          </button>
        </form>
      )
}

export default ButtonLogout