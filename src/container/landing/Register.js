import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import '../../assets/styles/register.scss'
import { useDispatch, useSelector } from 'react-redux'
// import { register } from '../../redux/actions/auth'

export const Register = ({ visible, setInvisible }) => {
  // const { loading } = useSelector((state) => state.auth)
  const [userInfo, setUserInfo] = useState()
  // const dispatch = useDispatch()
  const handleCancel = () => {
    setInvisible(false)
  }

  const onSubmit = () => {
    console.log(userInfo)
    // dispatch(register(userInfor))
  }

  return (
    <Modal
      visible={visible}
      title="Đăng ký"
      onCancel={handleCancel}
      footer={null}
    >
      <div className="register__modal">
        <Input
          size="large"
          placeholder="Địa chỉ email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <Input
          size="large"
          placeholder="Tên"
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <Input
          size="large"
          placeholder="Tên tài khoản"
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        />
        <Input.Password
          size="large"
          placeholder="Mật khẩu"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
        <Button
          type="primary"
          size="large"
          className="register_button"
          onClick={onSubmit}
          // loading={loading}
        >
          Xác nhận
        </Button>
      </div>
    </Modal>
  )
}
