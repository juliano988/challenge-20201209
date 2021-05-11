import React from "react";
import { Button, Modal } from "react-bootstrap";
import { TableItem } from "../../../customTypes";
import '../../../styles/sections/UsersTable/UserModal-styles.module.scss'

export default function UserModal(props: { modalUserData: TableItem, showUserModal: boolean, setShowUserModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Modal centered show={props.showUserModal} onHide={() => props.setShowUserModal(false)}>
      <Modal.Body>{props.modalUserData?.image}</Modal.Body>
    </Modal>
  )
}