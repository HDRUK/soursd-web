import React, { ChangeEvent } from 'react';
import { Modal, Typography, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useTranslations } from 'next-intl';
import FileUploadDetails from '../FileUploadDetails/FileUploadDetails';
import { FileType } from '@/consts/files';
import { File as ApplicationFile } from "@/types/application";
import { ModalContent, InstructionText, ButtonContainer } from './CertificateUploadModal.styles';

const NAMESPACE_TRANSLATION_FORM = "Form.Training";
const NAMESPACE_TRANSLATION_FILE_UPLOAD = "Certification";

interface CertificateUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  file?: ApplicationFile
  isSizeInvalid?: boolean;
  isScanning: boolean;
  isScanComplete: boolean;
  isScanFailed: boolean;
  isUploading: boolean;
}
export default function CertificateUploadModal({
    open,
    onClose,
    onUpload,
    file,
    isSizeInvalid,
    isScanning,
    isScanComplete,
    isScanFailed,
    isUploading,
  }: CertificateUploadModalProps) {
    const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
    const tUpload = useTranslations(NAMESPACE_TRANSLATION_FILE_UPLOAD);
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="certificate-upload-modal"
      >
        <ModalContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {tForm("trainingCertificateUpload")}
          </Typography>
          <InstructionText variant="body2">
            {tForm("uploadInstructions")}
          </InstructionText>
          <Divider sx={{mb: 2, backgroundColor: 'grey'}}/>
          <Typography variant="subtitle1" gutterBottom>
            {tForm("fileUpload")}
          </Typography>
          <FileUploadDetails
            fileButtonText={tForm("uploadCertification")}
            fileType={FileType.CERTIFICATION}
            fileTypesText={tUpload("fileTypesText")}
            fileNameText={
              file?.name || tForm("noCertificationUploaded")
            }
            isSizeInvalid={isSizeInvalid}
            isScanning={isScanning}
            isScanComplete={isScanComplete}
            isScanFailed={isScanFailed}
            isUploading={isUploading}
            onFileChange={onUpload}          
            message="certificationUploadFailed"
          />
          
          {file ? (
            <List>
              <ListItem sx={{pl: 0}}>
                <ListItemText
                  primary={file.name}
                />
              </ListItem>
            </List>
          ) : (
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              {tUpload("noFilesUploaded")}
            </Typography>
          )}
  
          <ButtonContainer>
            <Button onClick={onClose} variant="outlined" color="primary">
              {tForm("cancel")}
            </Button>
            <Button onClick={onClose} variant="contained" color="primary">
              {tForm("done")}
            </Button>
          </ButtonContainer>
        </ModalContent>
      </Modal>
    );
  }