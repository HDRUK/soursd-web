import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(90deg, rgba(191,130,212,1) 0%, rgba(212,184,222,1) 35%, rgba(255,255,255,1) 100%)',
        }}>
        <h2>Loading...</h2>
        <CircularProgress />
      </div>
    );
  }
  