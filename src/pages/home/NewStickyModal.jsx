import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Fab,
  Box,
  Grid,
  Fade,
  Modal,
  Paper,
  Button,
  Backdrop,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useConfig } from '../../Context'

import useUtils from '../../utils/useUtils'
import DateInput from '../../components/DateInput'
import TimeInput from '../../components/TimeInput'
import useStickyClient from '../../clients/StickyClient/useStickyClient'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1),
    width: '100%',
    height: `calc(100% - ${theme.spacing(2)}px)`,
    '& .MuiPaper-root': {
      maxWidth: 600,
    },
  },
  close: {
    cursor: 'pointer',
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    width: '66%',
    overflow: 'auto',
    maxHeight: '100%',
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '96%',
    },
  },
}))

const DEFAULT_STICKY = {
  title: '',
  description: '',
  date: '',
  hour: '',
}

const NewStickyModal = ({ onSuccess }) => {
  const classes = useStyles()
  const stickyClient = useStickyClient()
  const { formatDate, date, formatHours } = useUtils()
  const { setAlert } = useConfig()

  const [open, setOpen] = useState(false)

  const formik = useFormik({
    initialValues: { ...DEFAULT_STICKY },
    validationSchema: Yup.object({
      title: Yup.string().max(30).required(),
      description: Yup.string().max(200).required(),
      date: Yup.date().required(),
      hour: Yup.string().required(),
    }),
    onSubmit: (data) => {
      const dateFormat = date(data.date).format('YYYY-MM-DD')

      stickyClient().saveSticky({ ...data, date: dateFormat }).then(
        () => {
          setAlert({
            open: true,
            type: 'success',
            message: 'Sticky adicionado com sucesso!'
          })
          onSuccess()
          setOpen(false)
        }, (response) =>{
          setAlert({
            open: true,
            type: 'error',
            message: response.data
          })
        }
      )
    },
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    formik.resetForm()
    setOpen(true)
  }

  const handleSave = () => {
   formik.submitForm()
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="Adicione uma nova Sticky"
        className={classes.fab}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box className={classes.modal}>
            <Paper className={classes.paper}>
              <CloseIcon className={classes.close} onClick={handleClose} />
              <Box p={3}>
                <Box>
                  <Box mb={5}>
                    <Typography variant="h5" component="span" color="primary" className={classes.title}>
                      Adicione um novo sticky!
                    </Typography>
                  </Box>
                </Box>

                <Box mb={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DateInput
                        id="date"
                        label="Data"
                        title="Data"
                        fullWidth
                        {...formik.getFieldProps('date')}
                        error={formik.touched.date && !!formik.errors.date}
                        helperText={formik.touched.date && formik.errors.date}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TimeInput
                        id="hour"
                        label="Hora"
                        title="Hora"
                        fullWidth
                        {...formik.getFieldProps('hour')}
                        error={formik.touched.hour && !!formik.errors.hour}
                        helperText={formik.touched.hour && formik.errors.hour}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box mb={2}>
                  <TextField
                    id="title"
                    label="Informe um breve título"
                    title="Informe um breve título"
                    fullWidth
                    {...formik.getFieldProps('title')}
                    error={formik.touched.title && !!formik.errors.title}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Box>

                <Box mb={2}>
                  <TextField
                    id="description"
                    label="Descrição do seu lembrete"
                    title="Descrição do seu lembrete"
                    fullWidth
                    multiline
                    rowsMax={4}
                    {...formik.getFieldProps('description')}
                    error={formik.touched.description && !!formik.errors.description}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Box>

                <Box textAlign="end" pt={3}>
                  <Box display="inline" mx={1}>
                    <Button color="primary" variant="outlined" onClick={handleClose}>
                      CANCELAR
                    </Button>
                  </Box>

                  <Button color="primary" variant="contained" onClick={handleSave}>
                    SALVAR
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

NewStickyModal.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default NewStickyModal
