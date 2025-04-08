import BaseCtrl from '@/controller/base'
import { tb_users } from '@/models/tables/tb_users'

class UsersCtrl extends BaseCtrl {
  model = tb_users
}

export default UsersCtrl
