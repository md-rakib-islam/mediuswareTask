import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalTwo from "./ModalTwo";

function MyModal({ name, contacts }) {
  const [modal, setModal] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState();
  const [modalTwoHead, setModalTwoHead] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();

  const searchTextValue = (e) => {
    setLoading(true);
    setSearch(true);
    if (e) {
      axios
        .get(`https://contact.mediusware.com/api/contacts/?search=${e}`)
        .then((res) => {
          setSearchData(res.data.results);

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (contacts == "all_contracts") {
      axios
        .get("https://contact.mediusware.com/api/contacts/")
        .then((res) => {
          setFilteredData(res.data.results);
          setSearchData([]);
          setAllData(res.data.results);
          setModalTwoHead("All Contact Details");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(
          "https://contact.mediusware.com/api/country-contacts/United%20States/"
        )
        .then((res) => {
          setFilteredData(res.data.results);
          setSearchData([]);
          setAllData(res.data.results);
          setModalTwoHead("US Contact Details");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (contacts == "all_contracts" && search === false) {
        axios
          .get("https://contact.mediusware.com/api/contacts/")
          .then((res) => {
            setFilteredData(res.data.results);
            setSearchData([]);
            setAllData(res.data.results);
            setModalTwoHead("All Contact Details");
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(
            "https://contact.mediusware.com/api/country-contacts/United%20States/"
          )
          .then((res) => {
            setFilteredData(res.data.results);
            setAllData(res.data.results);
            setModalTwoHead("US Contact Details");
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 1000);
  }, [contacts]);

  useEffect(() => {
    if (isChecked) {
      setFilteredData(
        filteredData.filter((contact) => Number(contact.id) % 2 === 0)
      );
    } else {
      setFilteredData(allData);
    }
  }, [isChecked, filteredData]);

  return (
    <div>
      {openModal && (
        <ModalTwo
          modalTwoHead={modalTwoHead}
          toggle={setOpenModal}
          contact={contact}
          modal={openModal}
        />
      )}

      <Modal isOpen={modal} toggle={() => navigate("/problem-2")}>
        <ModalHeader toggle={() => navigate("/problem-2")}>
          {name ? name : ""}
          <br></br>
          <input
            id="search"
            type="text"
            placeholder="Search Country"
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                searchTextValue(ev.target.value);
              }
            }}
          />
        </ModalHeader>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <ModalBody>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col mx-auto">Id</th>
                    <th scope="col mx-auto">Phone Number</th>
                    <th scope="col mx-auto">Country</th>
                  </tr>
                </thead>

                {searchData.length == 0 && (
                  <tbody
                  // style={{ display: searchData ? "none" : "inline-block" }}
                  >
                    {filteredData?.map((contact) => (
                      <tr
                        key={contact.id}
                        onClick={() => {
                          setOpenModal(!openModal);
                          setContact(contact);
                        }}
                      >
                        <td>{contact.id}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.country.name}</td>
                      </tr>
                    ))}
                  </tbody>
                )}

                {searchData && (
                  <tbody>
                    {searchData?.map((contact) => (
                      <tr
                        key={contact.id}
                        onClick={() => {
                          setOpenModal(!openModal);
                          setContact(contact);
                        }}
                      >
                        <td>{contact.id}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.country.name}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </ModalBody>
          </>
        )}
        <ModalFooter style={{ justifyContent: "flex-start" }}>
          <button
            className="btn btn-md btnA"
            onClick={() => navigate("/all-contacts")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-md btnB"
            onClick={() => navigate("/us-contacts")}
          >
            US Contacts
          </button>
          <button
            className="btn btn-md btnC"
            onClick={() => navigate("/problem-2")}
          >
            Cancel
          </button>

          <input
            id="even"
            type="checkbox"
            placeholder="Show Even"
            onClick={() => setIsChecked(!isChecked)}
            value={isChecked}
          />
          <label htmlFor="even"> Even List</label>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MyModal;
