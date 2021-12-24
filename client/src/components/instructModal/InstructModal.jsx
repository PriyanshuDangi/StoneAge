import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styleClasses from './styles.module.css';

const modalData = {
    orbit: {
        header: {
            show: true,
            html: 'Controls',
        },
        body: {
            show: true,
            html: (
                <div className={styleClasses.body}>
                    <div>
                        <div className={styleClasses.center + ' ' + styleClasses.bold}>Mouse</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Hold Left Click</div>
                        <div className={styleClasses.right}>Look Around</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Hold Right Click</div>
                        <div className={styleClasses.right}>Look Around</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Scroll</div>
                        <div className={styleClasses.right}>Zoom In and Out</div>
                    </div>
                </div>
            ),
        },
        footer: {
            show: true,
            html: 'Close',
        },
    },
    move: {
        header: {
            show: true,
            html: 'Controls',
        },
        body: {
            show: true,
            html: (
                <div className={styleClasses.body}>
                    <div>
                        <div className={styleClasses.center + ' ' + styleClasses.bold}>Mouse</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Left Click</div>
                        <div className={styleClasses.right}>Lock Pointer</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Esc</div>
                        <div className={styleClasses.right}>Unlock pointer</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>PointerLock + Move Pointer</div>
                        <div className={styleClasses.right}>Look Around</div>
                    </div>
                    <div>
                        <div className={styleClasses.center + ' ' + styleClasses.bold}>Keyboard</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Arrow Keys</div>
                        <div className={styleClasses.right}>Move Forward or Backward</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>WASD Keys</div>
                        <div className={styleClasses.right}>Move Forward or Backward</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>EQ</div>
                        <div className={styleClasses.right}>Change Height</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Shift + Keys</div>
                        <div className={styleClasses.right}>To Increase Speed</div>
                    </div>
                </div>
            ),
        },
        footer: {
            show: true,
            html: 'Close',
        },
    },
    fly: {
        header: {
            show: true,
            html: 'Controls',
        },
        body: {
            show: true,
            html: (
                <div className={styleClasses.body}>
                    <div>
                        <div className={styleClasses.center + ' ' + styleClasses.bold}>Mouse</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Left Click</div>
                        <div className={styleClasses.right}>Move Forward</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Right Click</div>
                        <div className={styleClasses.right}>Move Backward</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Move Pointer</div>
                        <div className={styleClasses.right}>To Look Around</div>
                    </div>
                    <div>
                        <div className={styleClasses.center + ' ' + styleClasses.bold}>Keyboard</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Arrow Keys</div>
                        <div className={styleClasses.right}>Move Staight and Sideways</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>WASD Keys</div>
                        <div className={styleClasses.right}>Move Staight and Sideways</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Shift + Keys</div>
                        <div className={styleClasses.right}>To Increase Speed</div>
                    </div>
                </div>
            ),
        },
        footer: {
            show: true,
            html: 'Close',
        },
    },
    builder: {
        header: {
            show: true,
            html: 'Builder',
        },
        body: {
            show: true,
            html: (
                <div className={styleClasses.body}>
                    <div>
                        <div className={styleClasses.center + ' ' + styleClasses.bold}>Instruction</div>
                    </div>
                    <div className={styleClasses.col}>
                        <div>
                            <div>Select tiles from the top panel and build over the land.</div>
                            <div>Once you complete, publish it using the Publish Button.</div>
                        </div>
                    </div>
                    <div>
                        <div className={styleClasses.center + ' ' + styleClasses.bold}>Mouse</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Left Click</div>
                        <div className={styleClasses.right}>Put Cube</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Alt + Left Click</div>
                        <div className={styleClasses.right}>Remove Cube</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Hold Right</div>
                        <div className={styleClasses.right}>Rotate Around</div>
                    </div>
                    <div class={styleClasses.divider}></div>
                    <div>
                        <div className={styleClasses.left}>Pointer Over</div>
                        <div className={styleClasses.right}>RollOver Cube</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}>Scroll</div>
                        <div className={styleClasses.right}>Zoom In {'&'} Out</div>
                    </div>
                    <div>
                        <div className={styleClasses.left}> Ctrl + Hold Left</div>
                        <div className={styleClasses.right}>Rotate Around</div>
                    </div>
                </div>
            ),
        },
        footer: {
            show: true,
            html: 'Close',
        },
    },
};

const InstructModal = (props) => {
    const handleClose = (event) => {
        console.log(event);
        // event.stopPropagation();
        props.set(false);
    };

    let data = modalData[props.type];

    return (
        <>
            {data && (
                <Modal
                    show={props.show}
                    onHide={handleClose}
                    // size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    {data.header.show && (
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">{data.header.html}</Modal.Title>
                        </Modal.Header>
                    )}
                    {data.body.show && <Modal.Body>{data.body.html}</Modal.Body>}
                    {data.footer.show && (
                        <Modal.Footer>
                            <Button variant="outline-dark" onClick={handleClose}>
                                {data.footer.html}
                            </Button>
                        </Modal.Footer>
                    )}
                </Modal>
            )}
        </>
    );
};

export default InstructModal;
