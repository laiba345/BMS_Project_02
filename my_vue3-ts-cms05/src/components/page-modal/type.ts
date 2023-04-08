export interface IModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

// export interface IModalProps {
//   // 放到配置里面，和前面统一
//   modalConfig: IModalConfig
// }

export interface IModalProps {
  modalConfig: {
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
