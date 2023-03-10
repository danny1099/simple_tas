import { Logo } from '@/components/logo'
import { Separator } from '@/components/separator'
import { Title } from '@/components/title/Title'
import { ToggleTheme } from '@/components/toggle'
import { useDispatch } from 'react-redux'
import { logOut } from '@/redux/slices/userSlice'
import { Avatar } from '@nextui-org/react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { textInitials } from '@/helpers/text-initials'
import { Wrapper, TopbarBrand, TopbarItems } from '../styles/topbar-styled'

export function Topbar({ showTittle, user }) {
  const dispatch = useDispatch()

  const logOutSession = () => {
    dispatch(logOut())
  }

  return (
    <Wrapper>
      <TopbarBrand>
        <Logo />
        {showTittle && <Title text="Simple Task" size="1.3rem" />}
      </TopbarBrand>

      <TopbarItems>
        <ToggleTheme />
        <RiLogoutBoxLine
          size={20}
          cursor="pointer"
          className="log-out"
          onClick={logOutSession}
        />

        <Separator />

        {/* Avatar of user logged */}
        <Avatar
          src={user.photoURL}
          color="gradient"
          text={textInitials(user.displayName || user.email)}
          textColor="white"
          size="md"
          bordered
          pointer
        />
      </TopbarItems>
    </Wrapper>
  )
}
