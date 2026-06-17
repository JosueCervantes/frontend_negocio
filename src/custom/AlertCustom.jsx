import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

/**
 * @typedef {Object} AlertCustomProps
 * @property {boolean} estado
 * @property {string} titulo
 * @property {string} detalle
 * @property {Function} [onClose]
 * @property {Function} [onConfirm]
 * @property {string} [headerBg]
 * @property {boolean} [esConfirm]
 * @property {string} [confirmText]
 * @property {string} [cancelText]
 */