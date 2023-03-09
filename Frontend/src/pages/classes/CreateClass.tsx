import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import Toast from "../../helpers/Toast";
import { ClassCreateDTO } from "../../models/Classes/ClassCreateDTO";
import { ClassService } from "../../services/ClassService";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaHandHolding } from "react-icons/fa";

export default function CreateClass() {
    const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
    const navigate = useNavigate();
    const [inputName, setInputName] = useState<string>("");
    const [inputRegime, setInputRegime] = useState<string>("");
    const [inputCourse, setInputCourse] = useState<string>("");
    const [inputInitialDate, setInputInitialDate] = useState<Date>(new Date());
    const [inputLastDate, setInputLastDate] = useState<Date>(new Date());
    const [inputWorkLoad, setInputWorkLoad] = useState<number>(0);
    const classService = new ClassService();

    const schemaClassValidation = Joi.object({
        name: Joi.string().required().messages({
            'any.required': "Nome é obrigatório",
            'string.base': "Nome é obrigatório",
            'string.empty': "Nome é obrigatório",
        }),
        
    });
    
    const createClass = () => {
        setLoadingCreate(true);

        validateClass(inputName).then(async (result: any) => {
            if (result.error != null) {
                setLoadingCreate(false);
            } else {

                const createClass: ClassCreateDTO = {
                    name: inputName,
                    regime: inputRegime,
                    course: inputCourse,
                    initialDate: inputInitialDate,
                    lastDate: inputLastDate,
                    workLoad: inputWorkLoad
                }

                const response = await classService.CreateClass(createClass);

                if (response.success !== true) {
                    Toast.Show("error", response.message);
                    setLoadingCreate(false);
                    return;
                }

                Toast.Show("success", response.message);
                setLoadingCreate(false);
                navigate(-1);
            }

        })
    }
    const validateClass = (name: string) => {
        return new Promise(function (resolve) {
            var validationResult = schemaClassValidation.validate(
                {
                    name: name
                }, { abortEarly: false });
            resolve(validationResult);
            
            if (validationResult.error != null) {
            var message = validationResult.error!.message;
            Toast.Show("error", message);
            return false;
        }
        });
        
    }

    return(

        <div className="pageContainer">
            <div className="pageHeader">
                <br />
                <IoArrowBackSharp className="pageTitleBackIcon" onClick={() => {
                    navigate(-1);
                }} />
                Nova turma
                
            </div>

            <div className="pageBody">
            <Row style={{ margin: "0px", marginTop: "10px", padding: "0px" }}>
                    <InputComponent xl={3} lg={4} md={5} sm={12} xs={12} style={{ width: "100%" }} type={"text"} value={inputName} label={"Nome"} readOnly={false} onChange={(t: string) => setInputName(t)} />
                    <InputComponent xl={3} lg={4} md={5} sm={12} xs={12} style={{ width: "100%" }} type={"text"} value={inputRegime} label={"Regime"} readOnly={false} onChange={(t: string) => setInputRegime(t)} /> 
                    <InputComponent xl={3} lg={4} md={5} sm={12} xs={12} style={{ width: "100%" }} type={"text"} value={inputCourse} label={"Curso"} readOnly={false} onChange={(t: string) => setInputCourse(t)} />
                    <InputComponent xl={3} lg={4} md={5} sm={12} xs={12} style={{ width: "100%" }} type={"number"} value={inputWorkLoad} label={"Carga horária"} readOnly={false} onChange={(t: number) => setInputWorkLoad(t)} />  
                
            </Row>
            <Row style={{ margin: "0px", marginTop: "10px", padding: "0px" }}>
                    <InputComponent xl={2} lg={3} md={5} sm={6} xs={6} style={{ width: "100%" }} type={"date"} value={inputInitialDate.toString()} label={"Data de início"} readOnly={false} onChange={(t: Date) => setInputInitialDate(t)} />
                    <InputComponent xl={2} lg={3} md={5} sm={6} xs={6} style={{ width: "100%" }} type={"date"} value={inputLastDate.toString()} label={"Data do fim"} readOnly={false} onChange={(t: Date) => setInputLastDate(t)} />
                </Row>
            <Row style={{ margin: "0px", marginTop: "10px", padding: "0px" }}>
            <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                <ButtonComponent disabled={loadingCreate} loading={loadingCreate} text={"Gravar"} onClick={createClass} />
            </Col>
            </Row>
        </div>
        </div>

    )
}