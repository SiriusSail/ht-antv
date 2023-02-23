import * as Element from "element-plus";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus/lib/components/message'
import styles from "./index.module.scss";
import imgURL from "../images/logo.png";
import Service from '../../../views/Login/api/index'

const {
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
} = Element;
export default () => {
  const router = useRouter();
  const tohome = () => {
    router.push("/home");
  }
  const handlePersonal = () => {
    router.push("/personal");
  }
  const handleSetup = () => {
    router.push("/sys");
  }
  const handleHome = () => {
    router.push("/home");
  }
  const handleLogout = async () => {
    sessionStorage.removeItem('token')
    // const res = await Service.logout()
    // if (res.success)
    ElMessage.success({
      message: '退出成功',
      type: 'success',
    })
    // router.push("/login"); config.headers['cas-token'] = sessionStorage.getItem('token');
    // http://10.64.23.23/#/home
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL}/ddm-iic/logout/cas?cas-token=${sessionStorage.getItem('token')}`
  }
  return (
    <div className={styles.background}>
      <img onClick={tohome} className={styles.logo} src={imgURL} alt='' />

      <div className={styles.avatar}>
        <ElDropdown
          placement='bottom'
          v-slots={{
            dropdown: () => (
              <ElDropdownMenu>
                <ElDropdownItem onClick={handleHome}>首页</ElDropdownItem>
                <ElDropdownItem onClick={handlePersonal}>个人中心</ElDropdownItem>
                <ElDropdownItem onClick={handleSetup}>系统设置</ElDropdownItem>
                <ElDropdownItem onClick={handleLogout}>退出</ElDropdownItem>
              </ElDropdownMenu>
            ),
          }}
        >
          <ElAvatar
            size={40}
            src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          ></ElAvatar>
        </ElDropdown>
      </div>
    </div>
  )
};
