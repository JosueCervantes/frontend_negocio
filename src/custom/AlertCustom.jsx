import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const AlertCustom = ({
	estado = false,
	titulo = 'Alerta',
	detalle = '',
	onClose,
	onConfirm,
	headerBg = 'bg-primary',
	esConfirm = false,
	confirmText = 'Aceptar',
	cancelText = 'Cancelar',
}) => {
	const handleClose = () => {
		if (typeof onClose === 'function') {
			onClose()
		}
	}

	const handleConfirm = () => {
		if (typeof onConfirm === 'function') {
			onConfirm()
		}
	}

	return (
		<Modal show={estado} onHide={handleClose} centered>
			<Modal.Header closeButton className={headerBg}>
				<Modal.Title className="text-white">{titulo}</Modal.Title>
			</Modal.Header>

			<Modal.Body>{detalle}</Modal.Body>

			<Modal.Footer>
				{esConfirm ? (
					<>
						<Button variant="secondary" onClick={handleClose}>
							{cancelText}
						</Button>
						<Button variant="primary" onClick={handleConfirm}>
							{confirmText}
						</Button>
					</>
				) : (
					<Button variant="primary" onClick={handleClose}>
						{confirmText}
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}

export default AlertCustom