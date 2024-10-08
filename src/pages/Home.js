import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [nim, setNim] = useState('');
  const [found, setFound] = useState(false);
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl1 = process.env.REACT_APP_API_URL_1;
  const apiUrl2 = process.env.REACT_APP_API_URL_2;

  const handleNimChange = (e) => {
    setNim(e.target.value);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = async () => {
    try {
      if (!nim) {
        Swal.fire({
          title: 'NIM TIDAK BOLEH KOSONG!',
          text: 'PESERTA WISUDA GELOMBANG I TAHUN AKADEMIK 2024/2025',
          imageUrl: '/wisuda/logo_wisuda.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#0d6efd'
        });
        return;
      }

      setLoading(true);
      const response = await axios.post(apiUrl1, { nim });
      const responseData = response.data;

      if (responseData.found) {
        // if (responseData.mahasiswa[0]['Mengisi Tracer Study'] === "#N/A") {
        //   Swal.fire({
        //     title: 'ANDA BELUM MENGISI TRACER STUDY!',
        //     text: 'PESERTA WISUDA GELOMBANG I TAHUN AKADEMIK 2024/2025',
        //     imageUrl: 'logo_wisuda.png',
        //     imageHeight: 100,
        //     imageAlt: 'Logo',
        //     confirmButtonColor: '#0d6efd'
        //   });
        // }
        setMahasiswa(responseData.mahasiswa);
        setFound(true);
        setLoading(false);
      } else {
        setLoading(false);
        setFound(false);
        setMahasiswa(null);
        Swal.fire({
          title: 'NIM TIDAK TERDAFTAR!',
          text: 'PESERTA WISUDA GELOMBANG I TAHUN AKADEMIK 2024/2025',
          imageUrl: '/wisuda/logo_wisuda.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#0d6efd'
        });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setFound(false);
      setMahasiswa(null);
      Swal.fire({
        title: 'TERJADI KESALAHAN SAAT MENGAMBIL DATA!',
        text: 'PESERTA WISUDA GELOMBANG I TAHUN AKADEMIK 2024/2025',
        imageUrl: '/wisuda/logo_wisuda.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });
    }
  };

  const handleDownloadClick = async () => {
    try {
      const response = await axios.post(apiUrl2, { nim }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BUKTI_WISUDA_${nim}.pdf`);
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      link.remove();

      Swal.fire({
        title: `BUKTI REGISTRASI WISUDA DENGAN NIM: ${nim} BERHASIL DIUNDUH!`,
        text: 'PESERTA WISUDA GELOMBANG I TAHUN AKADEMIK 2024/2025',
        imageUrl: '/wisuda/logo_wisuda.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });

      setNim('')
      setFound(false)
      setMahasiswa(null)

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'TERJADI KESALAHAN SAAT MENGUNDUH DOKUMEN!',
        text: 'PESERTA WISUDA GELOMBANG I TAHUN AKADEMIK 2024/2025',
        imageUrl: '/wisuda/logo_wisuda.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });
    }
  };

  const clearSearchNIM = () => {
    setNim('');
    setFound(false);
    setMahasiswa(null);
  }

  return (
    <>
      <video className="bg-video" autoPlay muted loop>
        <source src="/wisuda/video.webm" type="video/mp4"/>
      </video>

      <video className="bg-video2" autoPlay muted loop>
        <source src="/wisuda/mobile2.webm" type="video/mp4"/>
      </video>
      <div className='container-fluid' style={{ textAlign: 'center' }}>
        <div className='row' style={{ textAlign: "center" }}>
          <div className='col-lg-12'>
            <img src='/wisuda/logo_wisuda.png' className="img-fluid" alt='' style={{ width: '259px', height: '100px', marginBottom: '40px', marginTop: '25px' }} />
          </div>
          <div className='col-lg-12' style={{ display: "flex", justifyContent: "center" }}>
            <p className='font-color-title' style={{ marginBottom: '-2px', fontWeight: 900, background: "#80808078", borderRadius: "10px", padding: "15px" }}>PESERTA WISUDA GELOMBANG I TAHUN AKADEMIK 2024/2025</p>
          </div>
        </div>

        {/* <div className='row' style={{ textAlign: "center" }}>
          <div className='col-lg-12'>
            <p style={{ marginTop: '20px', fontWeight: 900, fontSize: "14px" }}>Silakan mengisi Tracer Study <b style={{ color: "red" }}>bagi yang belum!</b></p>
          </div>
        </div>

        <div className='row' style={{ textAlign: "center" }}>
          <div className='col-lg-12'>
            <a href="https://karirlink.page.link/xA5De4nxGKrDQjE97" className='btn btn-warning' style={{ fontSize: "12px", marginTop: '10px', fontWeight: 900, marginRight: "10px" }}>Link Tracer Study <br />2017-2022</a>
            <a href="https://karirlink.page.link/3yq2KLmGmr9L2HH5A" className='btn btn-info' style={{ fontSize: "12px", marginTop: '10px', fontWeight: 900 }}>Link Tracer Study <br /> 2023</a>
          </div>
        </div> */}

        <div className='row'>
          <div className='col' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="input-group mb-3" style={{ width: '340px', marginTop: '30px' }}>
              <input type="number" className="form-control" placeholder="Masukkan NIM" value={nim} onChange={handleNimChange} onKeyDown={handleEnterKeyPress} />
              {nim && (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={clearSearchNIM}
                  data-toggle="tooltip"
                  title="Hapus Pencarian NIM"
                  data-placement="top"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
              <button className="btn btn-success" type="button" id="button-search" onClick={handleSearchClick} data-toggle="tooltip" title="Cari NIM" data-placement="top">Cari</button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12' style={{ display: 'flex', justifyContent: 'center' }}>
            {found && mahasiswa ? (
              <div style={{ marginTop: '10px' }}>
                {mahasiswa.map((mahasiswa, index) => (
                  <div className="table-responsive" key={index}>
                    <table className="table table-light" style={{ fontSize: '11px', boxShadow: '1px 1px 10px 0px black' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center', width: '100%', fontSize: '15px', fontWeight: 900 }} scope="col" colSpan={2}>Data Wisudawan/Wisudawati</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th style={{ textAlign: 'center', width: '100%' }} scope="col" colSpan={2}>&nbsp;</th>
                        </tr>
                        {/* <tr>
                          <th style={{ textAlign: 'left' }} scope="col">NIM</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa.NIM}</th>
                        </tr> */}
                        <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Nama</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa.Nama}</th>
                        </tr>
                        <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Program Studi</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa['Program Studi']}</th>
                        </tr>
                        <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Fakultas</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa.Fakultas}</th>
                        </tr>
                        {/* <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Ukuran Toga</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa['Ukuran Almamater']}</th>
                        </tr> */}
                        {/* <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Nomor Urut/Kursi</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa['Nomor Urut']}</th>
                        </tr> */}
                        {/* <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Sesi Wisuda</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa['Sesi Wisuda']}</th>
                        </tr> */}
                        <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Lokasi Wisuda</th>
                          <th style={{ textAlign: 'left' }} scope="col">: Sasana Budaya Ganesha (SABUGA)</th>
                        </tr>
                        <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Waktu Gladi Resik</th>
                          <th style={{ textAlign: 'left' }} scope="col">: Jumat, 8 November 2024, 13.30 WIB s.d. Selesai</th>
                        </tr>
                        <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Waktu Pelaksanaan</th>
                          <th style={{ textAlign: 'left' }} scope="col">: Sabtu, 9 November 2024, 07.00 WIB s.d. Selesai</th>
                        </tr>
                        {/* <tr>
                          <th style={{ textAlign: 'left' }} scope="col">Status Tagihan Wisuda</th>
                          <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa['Status Tagihan Wisuda'] === "Lunas" ? (<span>{mahasiswa['Status Tagihan Wisuda']}</span>) : (<span>Belum Lunas</span>)}  </th>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className='row' style={{ marginBottom: "20px" }}>
          <div className='col-lg-12' style={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? (
              <div className="d-flex justify-content-center">
                <button className="btn btn-dark" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status"> Loading...</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className='row' style={{ marginBottom: "30px" }}>
          <div className='col-lg-12' style={{ display: 'flex', justifyContent: 'center' }}>
            {found && mahasiswa ? (
              <button type="button" className="btn btn-success" onClick={handleDownloadClick} style={{ boxShadow: '1px 1px 10px 0px black', marginTop: "0px" }}>Download Bukti Registrasi Wisuda</button>
            ) : null}
          </div>
        </div>

      </div> {/*end div container*/}

      <footer>
        <span className="website" style={{ fontSize: '12px' }}>
          &copy; 2024&nbsp;<b><a href="https://www.unpas.ac.id/" target="_blank" rel="noreferrer">
            Universitas Pasundan
          </a></b>&nbsp;-&nbsp;
          <b><a href="https://sptik.unpas.ac.id/" target="_blank" rel="noreferrer">
            LPPTIK
          </a></b>&nbsp;-&nbsp;
          <span>
            All Rights Reserved&nbsp;-&nbsp;
          </span>
          <b><a href="https://www.unpas.ac.id/?page_id=58414" target="_blank" rel="noreferrer">
            Privacy and Copyright
          </a></b>
          <b> - Made with <span style={{ color: 'red' }}>❤</span>
          </b>
        </span>

        <br />

        <span className="sosial-media">
          <a href="https://www.instagram.com/univ_pasundan/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '5px' }} />
            univ_pasundan
          </a>
          <a href="https://web.facebook.com/universitaspasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '5px' }} />
            Universitas Pasundan
          </a>
          <a href="https://twitter.com/univ_pasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '5px' }} />
            @univ_pasundan
          </a>
          <a href="https://www.tiktok.com/@univ_pasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTiktok} style={{ marginRight: '5px' }} />
            univ_pasundan
          </a>
          <a href="https://www.youtube.com/c/UniversitasPasundanOfficial" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faYoutube} style={{ marginRight: '5px' }} />
            Universitas Pasundan Official
          </a>
        </span>
      </footer>

    </>
  );
}

export default App;
