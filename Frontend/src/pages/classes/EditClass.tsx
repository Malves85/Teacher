import Joi from "joi";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import Toast from "../../helpers/Toast";
import { ClassUpdateDTO } from "../../models/Classes/ClassUpdateDTO";
import { ClassService } from "../../services/ClassService";

export default function EditClass(){

    const { id } = useParams<{ id: string }>();
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [inputName, setInputName] = useState<string>("");
    const [inputRegime, setInputRegime] = useState<string>("");
    const [inputCourse, setInputCourse] = useState<string>("");
    const [inputInitialDate, setInputInitialDate] = useState<Date>(new Date());
    const [inputLastDate, setInputLastDate] = useState<Date>(new Date());
    const [inputWorkLoad, setInputWorkLoad] = useState<number>(0);
    const classService = new ClassService();
    const navigate = useNavigate();

    const schemaClientValidation = Joi.object({
        name: Joi.string().required().messages({
            'any.required': "Nome é obrigatório",
            'string.base': "Nome é obrigatório",
            'string.empty': "Nome é obrigatório",
        }),
        
    });

    const getClass = async () => {
        var response = await classService.GetById(Number(id));
        if (response.success === false || response.obj == null) {
            Toast.Show("error", response.message);
            return;
        }
        setInputName(response.obj.name);
        setInputRegime(response.obj.regime);
        setInputCourse(response.obj.course);
        setInputInitialDate(response.obj.initialDate);
        setInputLastDate(response.obj.lastDate);
        setInputWorkLoad(response.obj.workLoad);
    }

    useEffect(() => {
        getClass();
    }, []);
    
    const editClass = async () => {
        validateClient(inputName).then(async (result: any) => {
            if (result.error != null) {
                setLoadingUpdate(false);
            } else {
                const updatedClass: ClassUpdateDTO = {
                    id: Number(id) ?? '',
                    name: inputName,
                    regime: inputRegime,
                    course: inputCourse,
                    initialDate: inputInitialDate,
                    lastDate: inputLastDate,
                    workLoad: inputWorkLoad
                };
        
                setLoadingUpdate(true);
                const response = await classService.Edit(updatedClass);
                setLoadingUpdate(false);
        
                if (response.success !== true) {
                    Toast.Show("error", response.message);
                    return;
                }
                navigate(-1);
                Toast.Show("success", response.message);
            }
        })

    }

    const validateClient = (name: string) => {
        return new Promise(function (resolve) {
            var validationResult = schemaClientValidation.validate(
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

    /*const deleteClient = async () => {

        setLoadingUpdate(true);
        const response = await classService.Delete(Number(id));
        setLoadingUpdate(false);

        if (response.success !== true) {
            Toast.Show("error", response.message);
            return;
        }
        navigate(-1);
        Toast.Show("success", response.message);
        
    }*/

    return(
        <div className="pageContainer">
                <div className="pageHeader" style={{ width: "98%" }}>
                <br />
                <Row style={{ marginTop: "10px", marginBottom: "40px" }}>

                    <Col xl={1} lg={4} md={5} sm={12} xs={12} >
                        <IoArrowBackSharp className="pageTitleBackIcon" onClick={() => {
                            navigate(-1);
                        }} />
                        Voltar
                    </Col>
                    
                    <Col> 
                        <u>Editar Turma</u> 
                    </Col>
                    
                </Row>
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
                            <ButtonComponent disabled={loadingUpdate} loading={loadingUpdate} text={"Gravar"} onClick={editClass} />
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                            {/*<ButtonComponent disabled={loadingUpdate} loading={loadingUpdate} text={"Eliminar"} onClick={deleteClass} />*/}
                        </Col>
                    </Row>
                </div>
            </div>
    )
}